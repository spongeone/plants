import Head from 'next/head'

export const Home = (): JSX.Element => (
  <div className="bg-gray-800 text-2xl text-gray-100">
    <Head>
      <title>Plants</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">Welcome to Plants</h1>

      <button
        onClick={() => {
          window.alert('With typescript and Jest')
        }}
      >
        Test Button
      </button>
    </main>
  </div>
)

export default Home
