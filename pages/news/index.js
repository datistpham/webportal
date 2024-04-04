import React, { useEffect, useState } from 'react'
// import get_list_blog from '../../api/admin/get_list_blog'
// import ErrorFallback from '../Error/Error'
// import Loading from '../Loading/Loading'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import { Image } from 'antd'
import moment from 'moment'
// import { useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinesEllipsis from 'react-lines-ellipsis'
import Header from '@/app/component/Header';
import { useRouter } from 'next/router';
import get_post from '@/app/api/get_post';

const News = () => {
  
  return (
    <>
      <Header />
      <div className={"c-flex-center"} style={{width: "100%"}}>
        <div style={{width: "100%", maxWidth: 1200}}>
          <NewList />
        </div>
      </div>
    </>
  )
}

export const NewList= (props)=> {
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState()
  
  const [data, setData]= useState([])
  const router= useRouter()
  useEffect(()=> {
    (async ()=> {
      try {
        const result= await get_post()
        return setData(result.reverse())
      } catch (error) {
        setError(error)
      }
      finally {
        setLoading(false)
      }
    })()
  }, [])
//   if(loading=== true) {
//     return <Loading />
//   }
//   if(error) {
//     return <ErrorFallback error={error} />
//   }


  return (
<div style={{padding: 20, width: "100%", position: "relative"}}>
            {
              data?.map((item, key)=> <List key={key}>
                <ListItem onClick={()=> router.push("/news/"+ item?.id)}>
                  <ListItemButton style={{alignItems: "flex-start", gap: 20}}>
                    <Image style={{width: 200, aspectRatio: 3 / 2, background: "#e7e7e7", borderRadius: 10}} src={item?.image} alt={""}  />
                    <div>
                      <div style={{textTransform: "uppercase", color: "#2e89ff", fontSize: 18}}>{item?.title?.length > 0 ? item?.title : "Không có tiêu đề"}</div>
                      <br />
                      <div style={{display: "flex", alignItems: "center", gap: 10, color: "#000"}}>
                        <CalendarMonthIcon /> {moment(item?.time_created).format("DD/MM/YYYY")}
                      </div>
                      <br />
                      <LinesEllipsis lines={1} ellipsis={<span>...</span>}>
                        <div dangerouslySetInnerHTML={{__html: item?.content}}></div>
                      </LinesEllipsis>
                    </div>
                  </ListItemButton>
                </ListItem>
              </List>)
            }
          </div>
  )
}

export default News