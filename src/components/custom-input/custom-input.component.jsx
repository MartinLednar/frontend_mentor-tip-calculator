import "./custom-input.styles.scss";


const CustomInput = ({error...otherProps}) => (
    <input className={error ? "input-error" : ""} {...otherProps}/>
)