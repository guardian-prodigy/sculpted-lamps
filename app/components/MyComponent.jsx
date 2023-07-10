import {useMyContext} from '../Context/CarouselContext'
export function MyComponent() {
  const {product} = useMyContext();
console.log(product);
  return (
    <div>
      {/* <p>Value: {product}</p> */}
    </div>
  );
}
