import React from 'react'
import s from './ProfileInfo.module.css'
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

const ProfileInfo = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div id={profile.userId}>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large ? profile.photos.large : NoAvatarImg}/>
                <div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                    <div className={s.fullName}>{profile.fullName}</div>
                    <div>Обо мне: {profile.aboutMe}</div>
                    <div>В поиске работы: {profile.lookingForAJob ? 'ДА' : 'НЕТ'}</div>
                    {profile.lookingForAJob ?
                        <div>Какую работу я ищу: {profile.lookingForAJobDescription}</div> : null}
                </div>
                <div className={s.contactInfo}>
                    <h3>Contact Info:</h3>
                    <ul>
                        <li><a href={profile.contacts.facebook} target="_blank"><img src={facebookIcon}/></a></li>
                        <li><a href={profile.contacts.website} target="_blank"><img src={websiteIcon}/></a></li>
                        <li><a href={profile.contacts.vk} target="_blank"><img src={vkIcon}/></a></li>
                        <li><a href={profile.contacts.twitter} target="_blank"><img src={twitterIcon}/></a></li>
                        <li><a href={profile.contacts.instagram} target="_blank"><img src={instagramIcon}/></a>
                        </li>
                        <li><a href={profile.contacts.youtube} target="_blank"><img src={youtubeIcon}/></a></li>
                        <li><a href={profile.contacts.github} target="_blank"><img src={githubIcon}/></a></li>
                        <li><a href={profile.contacts.mainLink} target="_blank"><img src={mainLinkIcon}/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo