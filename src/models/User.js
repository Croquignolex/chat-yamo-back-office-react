import dayjs from "dayjs";

export default class User {
    constructor(user) {
        Object.assign(this, user);

        this.id = this.userId;

        this.deleted = (this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID");

        if(this.deleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setAvatar(image) {
        if(image) {
            this.avatar = image;
        }
    }

    set setImages(images) {
        this.images = images;
    }

    set setLastMessageTime(time) {
        this.lastMessageTime = time;
    }

    set setPendingMessage(flag) {
        this.pendingMessage = flag;
    }

    get isPendingMessage() {
        return this.pendingMessage;
    }

    set setId(id) {
        this.id = id;
    }

    get username() {
        return this.name;
    }

    get imageSrc() {
        return this.avatar;
    }

    set setCertified(identify) {
        this.certified = identify?.identityVerified;
    }

    set setStatus(status) {
        this.deleted = status?.deleted || this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID";
        this.blocked = status?.blocked;

        if(this.deleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setForceStatus(status) {
        this.deleted = this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID";
        this.blocked = status?.blocked;

        this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setSuspiciousState(state) {
        this.blacklisted = state?.suspicious;
    }

    set setAppData(data) {
        if(data.maybeSearchCriteria) {
            this.reduceSearchFilterField({
                gender : data.gender,
                minAge : data.minAge,
                maxAge : data.maxAge,
                applyAgeFilter : data.applyAgeFilter,
            });
        } else {
            this.reduceSearchFilterField({
                gender : "",
                minAge : 18,
                maxAge : 120,
                applyAgeFilter : false,
            })
        }

        this.appData = {
            status : data.status,
            deviceType : data.deviceType,
            languageCode : data.languageCode,
            appVersion : data.appVersion,
            release : data.release,
            sdkInt : data.sdkInt,
            manufacturer : data.manufacturer,
            model : data.model,
            hardware : data.hardware,
            device : data.device,
            deviceConsistentId : data.deviceConsistentId,
            deviceCountryIsoCode : data.deviceCountryIsoCode,
        };
    }

    set setSearchFilter(data) {
        this.reduceSearchFilterField({
            city : data.city,
            allCities : data.allCities,
            country : data.country,
            allCountries : data.allCountries,
            homeCountry : data.homeCountry,
            certified : data.certified,
            premiumUsers : data.premiumUsers,
            lookingFor : data.lookingFor,
            religion : data.religion,
            language : data.language,
        });
    }

    set setLifeStyle(data) {
        this.lifeStyle = {
            userId: data.userId,
            size: data.size,
            shape: data.shape,
            wayOfLiving: data.wayOfLiving,
            activity: data.activity,
            levelOfEducation: data.levelOfEducation,
            childrenNumber: data.childrenNumber,
            lookingFor: data.lookingFor,
            smokingLevel: data.smokingLevel,
            alcoholLevel: data.alcoholLevel,
            religion: data.religion,
            language: data.language,
            // sizeInCM: 0, // à ignorer
            musicGenre: data.musicGenre,
            firstDateBeLike: data.firstDateBeLike,
            followingDatesBeLike: data.followingDatesBeLike,
            kissMetric: data.kissMetric,
            aboutFuture: data.aboutFuture,
            socialMood: data.socialMood,
            children: data.children,
            travels: data.travels,
            countriesVisited: data.countriesVisited,
            nextCountryToVisit: data.nextCountryToVisit,
            interests: data.interests
        };
    }

    get isCertified() {
        return this.certified;
    }

    get isDeleted() {
        return this.deleted;
    }

    get isBlacklisted() {
        return this.blacklisted;
    }

    get isBlocked() {
        return this.blocked;
    }

    get isNotFound() {
        return this.notFound;
    }

    get localisation() {
        return this.isDeleted ? "" : `${this.city}, ${this.country}`;
    }

    get subscriptionEndDate() {
        return this.subscriptionEnd && dayjs(this.subscriptionEnd).format('LL');
    }

    reduceSearchFilterField(data) {
        const searchFilter = this.searchFilter;

        if(searchFilter) {
            this.searchFilter = {
                ...searchFilter,
                ...data,
            }
        } else this.searchFilter = data;
    }
}
