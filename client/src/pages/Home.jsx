import { persistor, userSliceActions } from "../redux/store"
import { useDispatch } from "react-redux"

export default function Home() {
  const dispatch = useDispatch()

  const onUserPurge = () => {
    persistor.purge()
      .then(() => {
        console.log('pruged')
        dispatch(userSliceActions.removeUserState())
      })
    }

  return (
    <div>
      <button onClick={onUserPurge}>Reset Persist</button>
    </div>
  )
}
