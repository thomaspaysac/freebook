export const ChangeNameForm = () => {
  return (
    <div>
      <form>
        <input type="text" name="first_name" id="first_name" placeholder="First name" minLength={2} maxLength={20} />
        <input type="text" name="last_name" id="last_name" placeholder="Last name" minLength={2} maxLength={20} />
      </form>
    </div>
  )
}