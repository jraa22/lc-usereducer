export default function fakeLogin(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'roberto' && password === 'password') {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
