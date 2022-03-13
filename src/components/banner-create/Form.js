import { useState } from 'react'

const Form = (props) => {
  const [formValues, setFormValues] = useState({
    width: 0,
    height: 0,
    backgroundColor: '',
    text: '',
  })

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  const handleReset = () => {
    setFormValues({
      width: 0,
      height: 0,
      backgroundColor: '',
      text: '',
    })
  }

  const handleSubmit = () => {
    // 값에 대한 유효성체크

    if (
      formValues.width === 0 ||
      formValues.height === 0 ||
      formValues.backgroundColor === '' ||
      formValues.text === ''
    ) {
      window.alert('값을 모두 채워주세요')
      return
    }

    // 부모로부터 전달받은 함수에 추가되길 원하는 값 전달
    console.log('추가', formValues)

    // 추가되는시점에 id 부여

    // const foo = { a: 10 }
    // const newFoo = { ...foo }
    props.onAddBanner({
      id: Date.now(),
      ...formValues,
    })
  }

  return (
    <div>
      <input
        name="width"
        placeholder="넓이"
        onChange={handleInputChange}
        value={formValues.width}
      />
      <input
        name="height"
        placeholder="높이"
        onChange={handleInputChange}
        value={formValues.height}
      />
      <input
        name="backgroundColor"
        placeholder="배경색"
        onChange={handleInputChange}
        value={formValues.backgroundColor}
      />
      <input
        name="text"
        placeholder="텍스트"
        onChange={handleInputChange}
        value={formValues.text}
      />
      <button onClick={handleSubmit}>배너추가</button>
      <button onClick={handleReset}>리셋</button>
    </div>
  )
}

export default Form
