import React from 'react'
import s from './ProfileInfo.module.css'
import imgBacgr from '../../../assets/images/bcgrd.jpg'
import Preloader from '../../common/Preloader/Preloader'
import NoAvatarImg from '../../../assets/images/noimg.jpeg'
import facebookIcon from '../../../assets/icon/facebook.svg'
import websiteIcon from '../../../assets/icon/website.svg'
import vkIcon from '../../../assets/icon/vk.svg'
import twitterIcon from '../../../assets/icon/twitter.svg'
import instagramIcon from '../../../assets/icon/instagram.svg'
import youtubeIcon from '../../../assets/icon/youtube.svg'
import githubIcon from '../../../assets/icon/github.svg'
import mainLinkIcon from '../../../assets/icon/mainLink.svg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div id={props.profile.userId}>
            {/*<div>*/}
            {/*    <img className={s.backgroundProfile} src={imgBacgr}/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : NoAvatarImg}/>
                <div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    <div className={s.fullName}>{props.profile.fullName}</div>
                    <div>Обо мне: {props.profile.aboutMe}</div>
                    <div>В поиске работы: {props.profile.lookingForAJob ? 'ДА' : 'НЕТ'}</div>
                    {props.profile.lookingForAJob ?
                        <div>Какую работу я ищу: {props.profile.lookingForAJobDescription}</div> : null}
                </div>
                <div className={s.contactInfo}>
                    <h3>Contact Info:</h3>
                    <ul>
                        <li><a href={props.profile.contacts.facebook} target="_blank"><img src={facebookIcon}/></a></li>
                        <li><a href={props.profile.contacts.website} target="_blank"><img src={websiteIcon}/></a></li>
                        <li><a href={props.profile.contacts.vk} target="_blank"><img src={vkIcon}/></a></li>
                        <li><a href={props.profile.contacts.twitter} target="_blank"><img src={twitterIcon}/></a></li>
                        <li><a href={props.profile.contacts.instagram} target="_blank"><img src={instagramIcon}/></a>
                        </li>
                        <li><a href={props.profile.contacts.youtube} target="_blank"><img src={youtubeIcon}/></a></li>
                        <li><a href={props.profile.contacts.github} target="_blank"><img src={githubIcon}/></a></li>
                        <li><a href={props.profile.contacts.mainLink} target="_blank"><img src={mainLinkIcon}/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo