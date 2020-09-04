import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";
import { firebaseCloudMessaging } from "../utils/webPush";
import { ToastContainer, toast } from "react-toastify";
import firebase from "firebase/app";
export default function Home() {
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((message) => console.log("foreground ", message));
    }
  }, []);

  const addUser = () => {
    const tokens = firebaseCloudMessaging.init();
    let token;
    tokens.then((data) => {
      token = data;
      console.log(data);
      if (token) {
        axios({
          method: "post",
          url: "http://192.168.0.102:3000/api/adduser",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },

          data: {
            deviceId: token,
            name: "prabhaw",
          },
        }).then((data) => {
          alert("User added");
        });
      }
    });
  };

  const sendNotic = () => {
    axios({
      method: "post",
      url: "http://192.168.0.102:3000/api/sendmsg",
    }).then(function (response) {
      toast.success("Sumitted Succesfully.");
    });
  };
  // onMessageListener().then((payload) => {
  //   const { title, body } = payload.data;
  //   console.log(payload.data);
  //   toast.info(`${title}; ${body}`);
  // });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <button onClick={addUser}>Add user</button>
          <button onClick={sendNotic}>Send NOtic</button>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
