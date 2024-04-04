import Header from "@/app/component/Header"
import axios from "axios"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Search= ()=> {
    const router= useRouter()
    const querySearch= router.query.query_search
    const [postData, setPostData]= useState([])
    useEffect(()=> {
        if(querySearch) {
            (async ()=> {
                const res= await axios({
                    url: "/api/v1/search",
                    method: "get",
                    params: {
                        querySearch: querySearch
                    }
                })
                const result= await res?.data
                setPostData(result)
            })()
        }
    }, [querySearch])
    return (
        <>
            <Header />
            <div style={{ width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {postData?.map((item, key) => (
          <div
            key={key}
            item
            xs={3}
            padding={3}
            style={{ padding: 10, width: "20%"}}
            onClick={()=> router.push("/news/"+ item?.id)}
          >
            <div
                style={{ width: "100%", aspectRatio: 2 / 3, objectFit: "cover", position: "relative" }}
            >
              <Image
                style={{backgroundColor: "#e5e5e5", borderRadius: 10}}
                fill={"layout"}
                alt={""}
                src={item?.image}
              />
            </div>
            <div style={{color: "#000"}}>
              <br />
              <div style={{fontSize: 18, fontWeight: 600}}>{item?.title || "Untitled"}</div>
              <br />
              <div>{moment(item?.time_created)?.format("DD-MM-YYYY")}</div>
            </div>
          </div>
        ))}
      </div>
        </>
    )
}

export default Search