import { useGetUserByIdQuery } from '@/provider/redux/query';
import React from 'react'

interface CheckoutSuccessUserDetailProps {
    orderID: string,
    userID: string,
}
const CheckoutSuccessUserDetail: React.FC<CheckoutSuccessUserDetailProps> = ({
    orderID, userID
}) => {
    const { data, isFetching, isSuccess, isError, error } = useGetUserByIdQuery(userID, {
        skip: !userID
    })
    if (isError) {
        console.log("this is here", JSON.stringify(error))

    }
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center">
                    <div className="text-blue-500 text-4xl mb-4">✔</div>
                    <h1 className="text-2xl font-bold">Thank you {isSuccess ? `${data.name.firstname} ${data.name.lastname}` : ""}</h1>
                    <p className="text-gray-600">Order #{orderID}</p>
                </div>

                <div className="my-8">
                    <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5132472087424!2d-79.30070508413282!3d43.85643097911519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d38a9a74a31d%3A0x5037b28c723aef0!2sMarkham%2C%20ON%2C%20Canada!5e0!3m2!1sen!2s!4v1615242178337!5m2!1sen!2s"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                    </div>
                    <p className="text-center text-gray-700">
                        We’ve accepted your order, and we’re getting it ready. A confirmation email has been sent to <span className="font-semibold">{isSuccess ? data.email : ""}</span>.
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h3 className="text-gray-700 font-semibold">Shipping address</h3>
                            <p><span className='font-semibold'>Street:</span> {isSuccess ?data.address.street : ""}</p>
                            <p><span className='font-semibold'>City:</span> {isSuccess ? data.address.city : ""}</p>
                            <p><span className='font-semibold'>Zipcode:</span> {isSuccess ? data.address.zipcode : ""}</p>
                        </div>
                    </div>
                </div>

                {/*  */}
            </div>
        </div>
    );
}

export default CheckoutSuccessUserDetail
