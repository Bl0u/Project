

export async function loginWithGoogle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            name: "Peter",
            email: "peter@gmail.com",
            source: "google",
          },
        });
      }, 5000);
    });
  }