import { Fragment } from "react";
import CusomAutoComplete from "../components/CusomAutoComplete";

export default function HomeView() {
  return (
    <Fragment>
      <section className="mx-auto flex h-[70vh] w-[50vw] flex-col items-center justify-center">
        <section className="mb-3 text-[180%] font-bold">Sousousou</section>
        <CusomAutoComplete className="w-full" />
      </section>
    </Fragment>
  );
}
