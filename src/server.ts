import { serverHttp } from "./app";

const PORT = process.env?.PORT || 5000;

serverHttp.listen(PORT, () => console.log('Server on'));