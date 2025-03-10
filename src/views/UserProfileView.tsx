import { ArrowLeftOutlined } from "@ant-design/icons";

export default function UserProfileView() {
  return <>
    <nav className="w-full h-10 flex justify-start items-center px-10"> 
      <section className="group/arrow cursor-pointer">
        <ArrowLeftOutlined className="group-hover/arrow:translate-x-[-5px] transition-transform duration-100"/>
        <span className="group-hover/arrow:underline">
          <span onClick={() => history.back()}>&nbsp; Back to previous</span>
        </span>
      </section>
    </nav>

    <section>
      {/* TODO: Will be written some code that not finished*/}
    </section>
    
  </>;
}
