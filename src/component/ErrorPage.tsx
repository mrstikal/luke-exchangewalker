import useFullInfoStore from '~store/useFullInfoStore';
import {Link} from 'react-router-dom';

const ErrorPage = () => {

	const errorCode = useFullInfoStore().error || '404';

	const errorMessages: Record<number, string> = {
		404: 'Nenalezeno',
		400: 'Žádná odpověď od serveru',
		500: 'Chyba serveru',
		503: 'Chyba v API',
	}

	const errorMessage = errorMessages[Number(errorCode)];

	return (
		<div className="min-h-screen flex flex-col content-center justify-center">
			<div className="font-sans text-3xl text-center">
				{errorMessage}
			</div>
			{errorCode !== '503' &&
					<Link className="font-sans text-lg text-center p-8 underline underline-offset-[3px]" to='/'>Zpět na domovskou stránku</Link>
			}
		</div>
	)
}

export default ErrorPage;