import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AuthProvider from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import ReactQueryProvider from "./ReactQueryProvider";
// import ReduxProvider from "./ReduxProvider";


const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        {/* <ReduxProvider> */}
          <CartProvider>
              <Theme>{children}</Theme>
          </CartProvider>
        {/* </ReduxProvider> */}
      </ReactQueryProvider>
    </AuthProvider>
  );
};

export default Providers;
