'use server';

interface FormState {
  errors?: Record<string, string[]>;
}

interface FormState {
  success?: boolean;
}

export async function handleForm(prevState: FormState, formData: FormData) {
  const password = formData.get('password');

  await new Promise(resolve => setTimeout(resolve, 2000));

  if (password === '12345') {
    return {
      success: true
    };
  } else {
    return {
      errors: {
        username: [],
        email: [],
        password: ['비밀번호가 틀렸습니다.']
      }
    };
  }
}
