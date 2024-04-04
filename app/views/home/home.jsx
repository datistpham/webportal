import get_post from "@/app/api/get_post";
import Header from "@/app/component/Header";
// import { Grid } from "@mui/material";
import moment from "moment";
// import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [postData, setPostData] = useState([]);
  const router= useRouter()

  useEffect(() => {
    (async () => {
      const result = await get_post();
      return setPostData(result);
    })();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <br />
      <div style={{ padding: 10, fontSize: 24 }}>New post</div>
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
            <div>
              <br />
              <div style={{fontSize: 18, fontWeight: 600}}>{item?.title || "Untitled"}</div>
              <br />
              <div>{moment(item?.time_created)?.format("DD-MM-YYYY")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
