import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'Indrakant - Developer';
	const description = "Hey 👋 I'm Indrakant, a developer";

	return {
		title,
		description,
		canonical: `https://ikd.is-a.dev/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'Indrakant',
			url: `https://ikd.is-a.dev/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://ikd.is-a.dev/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@its_ikD',
			site: '@its_ikD',
		},
		...props,
	};
}
