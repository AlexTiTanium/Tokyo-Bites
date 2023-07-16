import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserByIDQuery, useCreateUserMutation, User } from "../../store/services/user";

function Profile() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading, isFetching } = useGetUserByIDQuery('ourUserID');

  const [user, updateUser] = useState<User>(data ?? {
    name: 'Unknown Name',
    address: 'Uknown Adress',
    phone: 'Uknown Phone'
  });

  useEffect(() => {
    if (data) updateUser(data);
  }, [data]);

  const [
    createUser, // This is the mutation trigger
    result, // This is the destructured mutation result
  ] = useCreateUserMutation()

  console.log(error, data, result);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleAddUser = async () => {
    console.log('_______ create user', user);
    createUser(user);
  }

  return (
    <div className="profile">
      <img
        className="profile-sushi"
        src="/images/profile-sushi.png"
        alt="sushi-profile"
      />
      <h1 className="title">Your profile</h1>
      <div className="form">
        <img
          className="profile-photo"
          src="/images/icons/user.png"
          alt="profile-photo"
        />
        <div>
          <input type="text" name="name" onChange={handleChange} value={user.name} placeholder={user.name} />
        </div>
        <div>
          <input type="text" name="phone" id="phone" onChange={handleChange} value={user.phone} placeholder={user?.phone} />
        </div>
        <div>
          <input type="text" name="address" onChange={handleChange} value={user.address}  placeholder={user.address}/>
        </div>
        <p className="request">Please fill in all fields</p>

        <button onClick={handleAddUser}>SAVE</button>
      </div>
      <h1 className="title">Why can you trust us with your data?</h1>
      <ul className="text">
        <li>
          Your safety and trust is our top priority! We value each of our
          clients and take all necessary measures to protect your personal data.
          We are committed to using the information you provide (name, phone
          number, and shipping address) solely for the purposes of processing
          orders and providing quality service.
        </li>
        <br />
        <li>
          Your data will remain strictly confidential and will not be shared
          with third parties without your express consent. We will use your
          telephone number to contact you regarding your order, to notify you of
          its status, or to resolve any issues that may arise. The delivery
          address will be required for accurate and timely delivery of the
          order.
        </li>
        <br />

        <li>
          We use state-of-the-art technical security measures to protect your
          data from unauthorized access, alteration, or loss. Our servers are
          secured with encryption and strict security protocols.
        </li>
        <br />

        <li>
          In addition, we will not use your information to send you unsolicited
          information or spam. You can always unsubscribe from our notifications
          or request that your data be deleted from our system.
        </li>
        <br />

        <li>
          We appreciate your trust and are ready to answer any questions
          regarding the use of your data. Please contact us if you have any
          questions or concerns.
        </li>
        <br />

        <li>
          Thank you for choosing our sushi bar! We are committed to providing
          you with high-quality products and reliable service, and your trust is
          an integral part of this process.
        </li>
      </ul>
    </div>
  );
}

export default Profile;
