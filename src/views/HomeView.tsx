import { Fragment, useEffect, useState } from "react";
import CustomerAutoComplete from "../components/CustomerAutoComplete";
import { fetchHotspot } from "../utils/request/HotpotRequest";
import type { Hotpot } from "../utils/request/HotpotRequest";
import { List } from "antd";
import logo from "../assets/LOGO.png";

export default function HomeView() {
  const [hotpots, setHotpots] = useState<Hotpot[]>([])
  const [deafultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    fetchHotspot().then(({ data }) => {
      setHotpots(data);
      setDefaultValue(data[0].title)
    })
  }, [])
  

  return (
    <Fragment>
      <section className="mx-auto flex h-[70vh] w-[50vw] flex-col items-center justify-center">
        <section className="mb-3 text-[180%] font-bold">
          <img src={logo} className="h-20 rounded-lg" />
        </section>
        <CustomerAutoComplete className="w-full" defaultValue={deafultValue}/>

        <List className="w-2/3 mt10">
        {hotpots.map((hotpot, index) => 
            <List.Item key={index} >
              <a href={hotpot.address} className="hover:underline">{hotpot.title}</a>
              <span className="px-2 py-1 border-2 rounded-lg border-red-600 bg-red-800 text-white">{hotpot.category}</span>
            </List.Item>)}
        </List>
      </section>
    </Fragment>
  );
}
