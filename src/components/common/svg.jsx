
const RDSVG = ({ svgClassName, height, width, id }) => {
    return (
        <svg className={`ic ${svgClassName}`} height={height} width={width}>
            <use xlinkHref={`#${id}`}></use>
        </svg>
    )
}

export default RDSVG
