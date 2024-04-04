import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/component/Header";
import { useRouter } from "next/router";
import { AppContext } from "../_app";
import role from "@/app/api/role/role";

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
    <Link href="/admin/students">Manage students</Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link href="/admin/teachers">Manage teachers</Link>,
    "2",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/courses">Manage courses</Link>,
    "3",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/accounts">Manage accounts</Link>,
    "4",
    <ContainerOutlined />
  ),
  ,
  getItem(
    <Link href="/admin/post">Manage posts</Link>,
    "5",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/subject">Manage student subject</Link>,
    "6",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/schedule">Manage schedule</Link>,
    "7",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/application-absense">Manage application absense</Link>,
    "8",
    <ContainerOutlined />
  ),
  getItem(
    <Link href="/admin/request-signup">Manage request signup</Link>,
    "9",
    <ContainerOutlined />
  ),
//   getItem(
//     <Link href="/admin/teachers">Manage teacher</Link>,
//     "5",
//     <ContainerOutlined />
//   ),
//   getItem("Navigation One", "sub1", <ContainerOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//     getItem("Option 7", "7"),
//     getItem("Option 8", "8"),
//   ]),
//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 9", "9"),
//     getItem("Option 10", "10"),
//     getItem("Submenu", "sub3", null, [
//       getItem("Option 11", "11"),
//       getItem("Option 12", "12"),
//     ]),
//   ]),
];
const Admin = ({ children }) => {
  const {auth }= useContext(AppContext)
  const router= useRouter()
  const [selected, setSelected] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(()=> {
    if(router.pathname=== "/admin") {
      router.push("/admin/students")
    }
  }, [router])
  useEffect(()=> {
    (async ()=> {
      const result= await role()
      if(result?.login === true ) {
       if(parseInt(result?.data?.role) !== 3) {
         router.push("/login")
       }
      }
     
    })()
  }, [])
  return (
   <>
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
   </>
  );
};
export default Admin;
