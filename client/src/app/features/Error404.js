/**
 * @returns {JSX.Element} HTML to display in case of Not found error
 */
function Error404() {
	return (
		<div>
			<header className="App-header" style={{minHeight: "100vh"}}>
				<h1>404 Not found</h1>
			</header>
		</div>
	);
}

export default Error404;