import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preload" as="font" href="/fonts/Inter-Light.ttf" />
					<link rel="preload" as="font" href="/fonts/Inter-Regular.ttf" />
					<link rel="preload" as="font" href="/fonts/Inter-SemiBold.ttf" />
					<link rel="preload" as="font" href="/fonts/Inter-Bold.ttf" />
					{/* <link rel="stylesheet" href="/fonts/Inter-Regular.ttf" /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
