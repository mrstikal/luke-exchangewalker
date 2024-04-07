import useFetchAll from '~hook/useFetchAllHook';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Header from '~layout/Header';
import Footer from '~layout/Footer';
import Homepage from '~component/Homepage';
import SingleCurrency from '~component/SingleCurrency';
import ErrorPage from '~component/ErrorPage';

const router = createBrowserRouter([
	{
	  path: '/',
	  element: <Homepage />,
	},
	{
		path: 'currency/:currencyCode',
		element: <SingleCurrency />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export function App() {
	useFetchAll();

	return (
		<div>
			<Header />
			<div className="le-wrapper min-h-screen">
				<RouterProvider router={router} />
			</div>
			<Footer />
		</div>
	);
}

export default App;
