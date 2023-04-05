import splitbee from '@splitbee/web';
import toast from 'react-hot-toast';
import writeText from 'copy-to-clipboard';
import { Icon } from '@iconify/react';
import { Toaster } from 'react-hot-toast';
import { useMedia } from 'react-use';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Layout } from '~/layouts';

import { colors } from '~/lib';
import { Animate, List, Pill } from '~/components';
import { ListAction, ListActionType, Theme } from '~/types';

import { Button } from '~/components';
import { NavigationItemType } from '~/types';

import type { GetStaticProps } from 'next';

import type { Referrals } from '~/types';


interface ReferralsProps {
	referrals?: Referrals;
}

export const getStaticProps: GetStaticProps<ReferralsProps> = async () => {
	const { default: rawReferrals } = await import('~/data/referrals.json');

	const referrals = (rawReferrals as Referrals).sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	return {
		props: {
			referrals,
		},
	};
};

export default function ReferralsPage({ referrals }: ReferralsProps): JSX.Element {
	const { theme } = useTheme();
	const prefersDarkColorScheme = useMedia('(prefers-color-scheme: dark)', false);

	const isDark = useMemo(() => {
		switch (theme) {
			case Theme.SYSTEM:
				return prefersDarkColorScheme ? true : false;
			case Theme.LIGHT:
				return false;
			case Theme.DARK:
				return true;
		}
	}, [prefersDarkColorScheme, theme]);

	return (
		<Layout.Default seo={{ title: 'Indrakant ─ referrals' }}>
			<div className="flex flex-grow min-h-full pt-16 pb-12">
				<object
					data="http://infolab.stanford.edu/pub/papers/google.pdf"
					width="100%"
					type="application/pdf"
					height="500"></object>
				{/* <div className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"> */}
				{/* <div className="flex flex-shrink-0 justify-center">
						<Icon
							className="h-12 text-primary-500 w-auto"
							icon="feather:alert-triangle"
						/>
					</div>
					<div className="py-4 text-center">
						<h1 className="mt-2 text-4xl font-extrabold text-gray-500 dark:text-white tracking-tight sm:text-5xl">
							Whoops!
						</h1>
						<p className="mt-8 text-sm font-medium text-gray-300 dark:text-gray-400">
							Looks like you took a wrong turn.
							<br />
							The page you&apos;re looking for couldn&apos;t be found.
						</p>
						<div className="mt-6 flex justify-center items-center space-x-4">
							<Button.Standard
								type={NavigationItemType.ACTION}
								onClick={(): void => history.go(-1)}
								icon="feather:arrow-left">
								Back
							</Button.Standard>
							<Button.Standard
								type={NavigationItemType.LINK}
								href="/"
								icon="feather:home">
								Home
							</Button.Standard>
						</div>
					</div> */}
				{/* </div> */}
			</div>
			{/* <Toaster
				toastOptions={{
					position: 'bottom-right',
					style: {
						background: isDark ? colors.gray[900] : colors.gray[50],
						borderColor: isDark ? colors.gray[800] : colors.gray[100],
						borderWidth: '2px',
						color: isDark ? colors?.gray[400] : colors?.gray[700],
					},
				}}
			/>
			<div className="my-24 mx-2 sm:mx-6 lg:mb-28 lg:mx-8">
				<div className="relative max-w-xl mx-auto">
					<List.Container>
						{referrals.map((referral, index) => (
							<Animate
								animation={{ y: [50, 0], opacity: [0, 1] }}
								key={index}
								transition={{
									delay: 0.1 * index,
								}}>
								<List.Item
									actions={[
										{
											type: ListActionType.LINK,
											icon: 'feather:home',
											label: `${referral.name} homepage`,
											href: referral.homepage,
										},
										...(referral.code
											? [
													{
														type: ListActionType.BUTTON,
														icon: 'feather:hash',
														label: 'Copy Referral Code',
														onClick: () => {
															writeText(referral.code);
															toast.success('Copied referral code');
														},
													} as ListAction,
											  ]
											: []),
										{
											type: ListActionType.LINK,
											icon: 'feather:external-link',
											label: 'Referral Link',
											href: referral.url,
											onClick: () =>
												splitbee.track(referral.name.toLowerCase(), {
													code: referral.code,
													type: 'referral',
													url: referral.url,
												}),
										},
									]}
									description={referral.description}
									icon={referral.icon}
									iconColor={referral.color}
									title={referral.name}>
									{referral.bonus && (
										<div className="m-2 mt-0">
											<Pill.Standard className="flex items-center justify-center w-full md:pb-2 bg-primary-500 bg-opacity-15 saturate-200 text-sm text-primary-500 rounded-lg">
												<Icon
													className="mt-0.5 mr-2"
													icon="feather:award"
												/>
												{referral.bonus}
											</Pill.Standard>
										</div>
									)}
								</List.Item>
							</Animate>
						))}
					</List.Container>
				</div>
			</div> */}
		</Layout.Default>
	);
}
