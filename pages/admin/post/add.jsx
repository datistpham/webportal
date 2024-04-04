// import CreateBlog from '@/app/view/post/add'
import dynamic from 'next/dynamic'
import React from 'react'
import Admin from '..'
const CreateBlog= dynamic(()=> import("@/app/view/post/add"), {ssr: true, loading: ()=> <>Loading...</>})
const AddPost = () => {
  return (
    <Admin>
      <div style={{flex: "1 1 0", height: "100vh", overflow: "auto"}}>
        <CreateBlog />
      </div>
    </Admin>
  )
}

export default AddPost