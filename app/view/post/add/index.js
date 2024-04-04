import add_post from '@/app/api/add_post';
import upload_image from '@/app/api/upload_image';
import UploadImage from '@/utils/UploadImage';
import { TextField } from '@mui/material';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import swal from 'sweetalert';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Editor = () => {
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent]= useState("")
  const [title, setTitle]= useState("")
  const [image, setImage]= useState()
  const handleContentChange = (value) => {
    setContent(value);
    setPreviewContent(value)
  }

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
          const imageFinal= await upload_image(image.thumbUrl)
          const result= await add_post(title, imageFinal.img, content)
          if (result?.add === true) {
                  swal("Notice", "Create is successfully", "success")
            } else {
              swal("Notice", "Error", "error");
            }
        }} type={"primary"}>Create post</Button>
      </div>
      <div style={{flex: "1 1 0"}}>
      <div style={{marginBottom: 12, fontSize: 24, fontWeight: 600, color: "#000"}}>Preview content</div>
      <div style={{color: "#000"}} dangerouslySetInnerHTML={{ __html: previewContent }}></div>
      </div>
    </div>
    </>

  )
}

export default Editor;