const idle = () => ({ data: null, loading: false, error: null })
const start = () => ({ data: null, loading: true, error: null })
const fulfill = data => ({ data, loading: false, error: null })
const reject = error => ({ data: null, loading: false, error })

export default { idle, start, fulfill, reject }
