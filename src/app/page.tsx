import { DBconnect } from "../config/DBconnect";


export default async function Home() {


  const fun = async() =>{
    console.log('started');
    await DBconnect();
  }
  // await fun();
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}
