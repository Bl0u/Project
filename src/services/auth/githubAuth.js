
export async function loginWithGitHub() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            name: "Rose",
            email: "Rose@gmail.com",
            source: "github",
          },
        });
      }, 5000);
    });
  }