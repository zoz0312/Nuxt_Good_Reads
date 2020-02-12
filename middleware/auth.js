export default function ({ store, redirect }) {
	if (store.state.authUser === null) {
		return redirect('/');
	}
}
