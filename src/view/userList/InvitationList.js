import React, { useState, useEffect } from "react";
import { invites } from "./InvitesList";
import { update_invites } from "./InvitesList";
import * as _ from "lodash"
import CryptoJS from 'crypto-js';
import { toast } from "react-toastify";


const InvitationList = () => {
    const decrypted = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('userData')), 'userList');
    const decryptedObject = decrypted.toString(CryptoJS.enc.Utf8);
    const userId = JSON.parse(decryptedObject).user_id;
    const [invitationData, setInvitationData] = useState(invites)
    const [updateListLength, setUpdateListLength] = useState(0);

    const onClick = () => {
        toast.success('Logout successfully')
        setTimeout(() => {
            window.location.href = "/login"
        }, 1000)
        localStorage.removeItem('password')
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const id = setInterval(() => {
            setUpdateListLength((oldCount) => oldCount + 1)
            if (updateListLength < _.filter(update_invites, { 'user_id': JSON.stringify(userId) }).length) {
                setInvitationData([...invitationData, { ..._.filter(update_invites, { 'user_id': JSON.stringify(userId) })[updateListLength] }]);
            }
        }, [5000])
        return () => {
            clearInterval(id);
        };
    }, [updateListLength]);

    return (
        <main className="user-list--page">
            <div className="user-list--block">
                <div className="invitation-list-table">
                    <table>
                        <tr>
                            <th>invite Id</th>
                            <th>sender Id</th>
                            <th>sig Id</th>
                            <th>invite</th>
                            <th>vector</th>
                            <th>invite Time</th>
                            <th>user Id</th>
                            <th>status</th>
                        </tr>
                        {
                            _.map(_.filter(invitationData, { 'user_id': JSON.stringify(userId) }),
                                ((data, key) => {
                                    return (
                                        <tr key={key} className={`${(data.status === 'read') ? 'status-read' : 'status-unread'}`}>
                                            <td>{data.invite_id}</td>
                                            <td>{data.sender_id}</td>
                                            <td>{data.sig_id}</td>
                                            <td>{data.invite}</td>
                                            <td>{data.vector}</td>
                                            <td>{data.invite_time}</td>
                                            <td>{data.user_id}</td>
                                            <td>{data.status}</td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </table>
                </div>
                <div className="logout-button--block">
                    <button onClick={onClick} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </main>
    )
}


export default InvitationList