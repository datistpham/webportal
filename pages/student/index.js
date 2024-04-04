import {
  // AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/component/Header";
// import get_class_homeroom from "@/app/api/teacher/get_class_homeroom";
import get_profile_student from "@/app/api/student/get_profile"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AppContext } from "../_app";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link href="/student/profile">Profile</Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link href="/student/contact">Contact</Link>,
    "2",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/student/register/term">Register term</Link>,
    "4",
    <ContainerOutlined />
  ),
  ,
  getItem(
    <Link href="/student/feedback">Feed back</Link>,
    "5",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/student/application/absense">Application absense</Link>,
    "6",
    <ContainerOutlined />
  ),
];
export const StudentContext= createContext()
const Student = ({ children }) => {
  const {auth }= useContext(AppContext)
  const router= useRouter()
  const [selected, setSelected] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [studentData, setStudentData]= useState()
  useEffect(()=> {
    (async ()=> {
      const result= await get_profile_student(Cookies.get("uid"))
      return setStudentData(result[0])
    })()
  }, [])
  useEffect(()=> {
    if(router.pathname=== "/student") {
      router.push("/student/profile")
    }
  }, [router])
  useEffect(()=> {
    if(auth=== false) {
      router.push("/login")
    }
  }, [auth, router])
  return (
    <StudentContext.Provider value={{studentData}}>
      <Header />
      <div style={{ width: "100%", display: "flex", height: "100vh" }}>
        <div
          style={{
            maxWidth: 256,
          }}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            onClick={(e) => setSelected(e.key)}
            selectedKeys={selected}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
        {children || ""}
      </div>
    </StudentContext.Provider>
  );
};
export default Student;
