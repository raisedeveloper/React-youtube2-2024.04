import React from "react";
// import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";


export default function VideoCard({ video }) {
  const { data: url } = useQuery({
    queryKey: ['channel', video],
    queryFn: async () => {
      return axios
        .get('/data/channel.json')
        .then(res => res.data.items[0].snippet.thumbnails.default.url)
    }, staleTime: 1000 * 60 * 5,
  });

  const titleStyle = {
    width: 250,
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
  };

  const cardStyle = {
    border: 'none', maxHeight: 300, width: 290, margin: '5px 0',
    '&:hover': {
      cursor: 'pointer', // 마우스를 올렸을 때 커서를 클릭 모양으로 변경
    },
  }

  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  // const [viewCount, setViewCount] = useState(null); // 조회수

  // if (typeof (video.id) !== 'string' && video.id.kind === 'youtube#channel')
  //   return;

  const videoId = typeof (video.id) === 'string' ? video.id : video.id.videoID;

  // const urls = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

  // axios.get(urls)
  //   .then(response => {
  //     setViewCount(response.data.items[0].statistics.viewCount);
  //   })
  //   .catch(error => {
  //     console.error('API 호출 오류:', error);
  //   });



  return (
    <Card variant="outlined" sx={cardStyle} onClick={() => {
      navigate(`/videos/watch/${videoId}`, { state: { video } })
    }}>
      <CardContent>
        <img src={thumbnails.medium.url} alt={title} style={{ width: 270, borderRadius: 20 }} />
        <div style={{ flex: 1, justifyContent: "center", display: 'flex' }}>
          {url && <img src={url} alt={""} style={{ width: 30, height: 30, marginTop: 10, marginRight: 8, borderRadius: "100%" }} />}
          <p style={{ ...titleStyle, fontWeight: 'bolder' }}>{title}</p>
        </div>
        <div>
          <p style={titleStyle}>{channelTitle}</p>
        </div>
        <div>
          <p style={titleStyle}>{formatAgo(publishedAt, 'ko')}</p>
          {/* <p>총 조회수: {viewCount}</p> */}
        </div>
      </CardContent>
    </Card>
  )
}


// 주석 부분은 조회수 받아오는 것 - api 녹으니 주의