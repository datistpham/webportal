import { v4 } from "uuid"
import connection from "../../connect"
import { sendMailAccount } from "../../utils/mail";

function generateStudentId() {
    const year = new Date().getFullYear().toString().slice(-2);
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return year + randomDigits;
  }

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-='; // các ký tự sẽ được sử dụng để tạo mật khẩu
    let password = '';
    for (let i = 0; i < 8; i++) { // lặp 8 lần để tạo 8 ký tự cho mật khẩu
      const randomIndex = Math.floor(Math.random() * chars.length); // lấy một chỉ số ngẫu nhiên trong mảng chars
      password += chars[randomIndex]; // thêm ký tự tại chỉ số ngẫu nhiên vào mật khẩu
    }
    return password;
  };
  
const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {first_name, last_name, middle_name, phone, email, dob, class_id, avatar, id}= req.body
            const account_id= v4()
            const [rows]= await connection.execute("INSERT INTO student(first_name, middle_name, last_name, class_id, dob, phone, avatar, account_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [first_name, middle_name, last_name, class_id, dob, phone, avatar, account_id])
            const account= generateStudentId()
            const password= generatePassword()
            const [rows1]= await connection.execute("INSERT INTO account(account_id, account, password, role) VALUES(?, ?, ?, ?)", [account_id, account, password, 1])
            sendMailAccount(email, account, password)
            const [rows2]= await connection.execute("DELETE FROM sign_up_student WHERE id= ?", [id])
            return res.status(200).json({signup: true, email: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

export default handler