import { Button } from "antd";
import { Link } from "react-router";
import "./root.css";


export default function RootView() {
    return (
        <section className="root">
            <h1 className="title">欢迎来到<span className="highlight">Sous</span>ousou</h1>
            <Button type="primary" className="btn">
                <Link to='/login'>进入</Link>
            </Button>
        </section>
    )
}
