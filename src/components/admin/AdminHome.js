import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import moment from 'moment'

const AdminHome = () => {

    const { userData, setUserData } = useContext(UserContext)

    const [reservations, setReservations] = useState([
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f74947344f2d60aed33762d",
            "name": "Filip Sjöberg",
            "email": "filip.mail@mail.com",
            "phone": "0701141424",
            "people": 6,
            "time": "18.00",
            "createdAt": "2020-09-30T14:21:39.200Z",
            "updatedAt": "2020-09-30T14:21:39.200Z",
            "slug": "filip-sjoeberg-0016",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f758aba318f8607816cc02a",
            "name": "Filip Sjöberg",
            "email": "filip.mail@mail.com",
            "phone": "0701141424",
            "people": 6,
            "time": "18.00",
            "createdAt": "2020-10-01T07:52:26.640Z",
            "updatedAt": "2020-10-01T07:52:26.640Z",
            "slug": "filip-sjoeberg-0017",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f758ad6318f8607816cc02b",
            "name": "Fredrik Widegren",
            "email": "fidde@mail.com",
            "phone": "0701141421",
            "people": 6,
            "time": "18.00",
            "createdAt": "2020-10-01T07:52:54.990Z",
            "updatedAt": "2020-10-01T07:52:54.990Z",
            "slug": "fredrik-widegren",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f758af5318f8607816cc02c",
            "name": "Johan Nordtröm",
            "email": "cool@mail.com",
            "phone": "0701141121",
            "people": 6,
            "time": "18.00",
            "createdAt": "2020-10-01T07:53:25.312Z",
            "updatedAt": "2020-10-01T07:53:25.312Z",
            "slug": "johan-nordtroem",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f758c43318f8607816cc02d",
            "name": "Erik Källqvis",
            "email": "tja@mail.com",
            "phone": "0701141121",
            "people": 6,
            "time": "21.00",
            "createdAt": "2020-10-01T07:58:59.916Z",
            "updatedAt": "2020-10-01T07:58:59.916Z",
            "slug": "erik-kaellqvis",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f759c2a91fa310c53a649a5",
            "name": "Gurra G Karlsson",
            "email": "hej@mail.com",
            "phone": "0701141121",
            "people": 6,
            "time": "21.00",
            "createdAt": "2020-10-01T09:06:50.140Z",
            "updatedAt": "2020-10-01T09:06:50.140Z",
            "slug": "gurra-g-karlsson-0001",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f759c2a91fa310c53a649a6",
            "name": "Gurra G Karlsson",
            "email": "hej@mail.com",
            "phone": "0701141121",
            "people": 6,
            "time": "21.00",
            "createdAt": "2020-10-01T09:06:50.823Z",
            "updatedAt": "2020-10-01T09:06:50.823Z",
            "slug": "gurra-g-karlsson-0002",
            "__v": 0
        },
        {
            "date": "2020-10-01T00:00:00.000Z",
            "_id": "5f759c2b91fa310c53a649a7",
            "name": "Gurra G Karlsson",
            "email": "hej@mail.com",
            "phone": "0701141121",
            "people": 6,
            "time": "21.00",
            "createdAt": "2020-10-01T09:06:51.554Z",
            "updatedAt": "2020-10-01T09:06:51.554Z",
            "slug": "gurra-g-karlsson-0003",
            "__v": 0
        }
    ])
    const [todaysDate, setTodaysDate] = useState(moment().format('L'))




    return (
        <>
            <div className="admin-wrapper">
                <h1>Hello, you are logged in as {userData.user.email}</h1>

                {
                    reservations.map((reserv, index) => (
                        <Card key={index} style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Name: {reserv.name}</ListGroup.Item>
                                <ListGroup.Item>Date: {reserv.date}</ListGroup.Item>
                                <ListGroup.Item>Time: {reserv.time}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default AdminHome
