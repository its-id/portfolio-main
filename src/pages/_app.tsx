import NProgress from 'nprogress';
import splitbee from '@splitbee/web';
import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffectOnce, useEvent } from 'react-use';
import { useRouter } from 'next/router';
import Script from 'next/script';

import 'inter-ui/inter.css';
import 'nprogress/nprogress.css';
import 'windi.css';

import { colors, useClick } from '~/lib';
import { Theme } from '~/types';

NProgress.configure({
	easing: 'ease',
	minimum: 0.3,
	showSpinner: false,
	speed: 800,
});

export { reportWebVitals } from 'next-axiom';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();
	const [play] = useClick();

	useEvent('mousedown', () => play());
	useEvent('mouseup', () => play());

	useEffectOnce(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());

		if (process.env.NODE_ENV === 'production')
			splitbee.init({
				disableCookie: true,
			});
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM} themes={Object.values(Theme)}>
			<Analytics />
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>

			<Script strategy="lazyOnload">
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
			</Script>
			<Component {...pageProps} />
			<style jsx global>{`
				#nprogress .bar {
					height: 0.25rem;
					background-color: ${colors.primary[500]};
				}
			`}</style>
		</ThemeProvider>
	);
}
