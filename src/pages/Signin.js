import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from '../contexts/user-context'

const SigninPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { setUser } = useUserContext()

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      // 1. 서버에서 전체 유저를 받아온다.
      // GET = 단순히 서버에한테 데이터를 요청 (fetch의 기본 옵션은 GET)
      // POST = 브라우저가 정보를 서버에 전달할 때
      // 비동기 (fetch, Promise), 동기

      // 비동기를 동기처럼 보이게 만들어야한다.
      const response = await fetch('http://localhost:7777/users')
      const users = await response.json()

      // 2. 받아온 유저의 정보와 우리가 입력받은 정보를 비교한다.
      // - 정보가 O => 로그인 성공
      // - 정보가 없거나 틀리다면 => 로그인 실패

      // 우리가 입력한 이메일을 가진 유저가 있는가?
      const user = users.find((user) => {
        return user.email === formValues.email
      })

      if (!user) {
        window.alert('이메일 또는 패스워드 정보를 확인해주세요')

        return
      }

      // 여기까지 왔다는것은 입력한 이메일을 가진 유저가 있다는것이다.
      // 찾은 유저가 가진 패스워드랑 입력받은 패스워드가 같은지 비교
      if (user.password !== formValues.password) {
        window.alert('이메일 또는 패스워드 정보를 확인해주세요')

        return
      }

      // context 에 유저 정보를 저장
      setUser({
        email: user.email,
        job: user.job,
        name: user.name,
      })

      navigate('/')
    } catch (e) {
      // 에러발생 !!
      window.alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요')
    }
  }

  return (
    <div>
      <h1>로그인 </h1>
      <input
        name="email"
        placeholder="이메일을 입력해주세요"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>로그인</button>
    </div>
  )
}

export default SigninPage
