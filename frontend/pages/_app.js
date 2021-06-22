import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';



function MyApp({ Component, pageProps }) {
  return (
    // <div style={{ backgroundImage: "url(/background.jpg)", height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Layout >
        <Component  {...pageProps} />
      </Layout>
    // </div>
  )
}

export default MyApp
