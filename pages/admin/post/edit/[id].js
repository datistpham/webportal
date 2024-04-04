import add_post from '@/app/api/add_post';
import detail_new from '@/app/api/detail_new';
import update_post from '@/app/api/update_post';
import upload_image from '@/app/api/upload_image';
import UploadImage from '@/utils/UploadImage';
import { TextField } from '@mui/material';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import swal from 'sweetalert';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const EditPost = () => {
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent]= useState("")
  const [title, setTitle]= useState("")
  const [image, setImage]= useState()
  const handleContentChange = (value) => {
    setContent(value);
    setPreviewContent(value)
  }
  const [data, setData]= useState()
  const router= useRouter()
  const {id }= router.query
  useEffect(()=> {
    (async ()=> {
        const result= await detail_new(id)
        setContent(result?.content)
        setPreviewContent(result?.content)
        setTitle(result?.title)
        setImage(result?.image)
    })()
  }, [id])
  return (
    <>
      <TextField value={title} onChange={(e)=> setTitle(e.target.value)} style={{marginTop: 12, marginBottom: 12}} label={"Post title"} />
      <UploadImage setImage={setImage} title={"Image post"} />
      <div></div>
      <br />
      <div style={{display: "flex", gap: 10}}>
      <div style={{flex: "1 1 0"}}>
        <ReactQuill style={{color: "#000"}} value={content} onChange={handleContentChange} />
        <br />
        <Button onClick={async ()=> {
          if(image.thumbUrl) {
            const imageFinal= await upload_image(image.thumbUrl)
            const result= await update_post(id, title, imageFinal.img, content)
            if (result?.add === true) {
                    swal("Notice", "Create is successfully", "success")
                } else {
                swal("Notice", "Error", "error");
                }
          }
          else {
            const result= await update_post(id ,title, image, content)
            if (result?.update === true) {
                    swal("Notice", "Update is successfully", "success")
                    .then(()=> router.push("/admin/post"))
                } else {
                swal("Notice", "Error", "error");
                }
          }
        }} type={"primary"}>Update post</Button>
      </div>
      <div style={{flex: "1 1 0"}}>
      <div style={{marginBottom: 12, fontSize: 24, fontWeight: 600, color: "#000"}}>Preview content</div>
      <div style={{color: "#000"}} dangerouslySetInnerHTML={{ __html: previewContent }}></div>
      </div>
    </div>
    </>

  )
}

export default EditPost;