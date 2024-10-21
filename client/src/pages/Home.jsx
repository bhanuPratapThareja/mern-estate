import { persistor, userSliceActions } from "../redux/store"
import { useDispatch } from "react-redux"

export default function Home() {
  const dispatch = useDispatch()

  const onUserPurge = () => {
    persistor.purge()
      .then(() => {
        console.log('purged')
        dispatch(userSliceActions.removeUserState())
      })
    }

  return (
    <div>
      <button onClick={onUserPurge}>Reset Persist</button>
    </div>
  )
}
