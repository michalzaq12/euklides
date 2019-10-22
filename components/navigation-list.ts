export interface INavigationItem {
    title: string
    icon: string
    path: string
}


export const teacherNav : ReadonlyArray<INavigationItem> = [
    {
        title: 'Panel',
        icon: 'home',
        path: '/panel'
    },
    {
        title: 'Baza zadań',
        icon: 'list',
        path: '/baza-zadan'
    },
    {
        title: 'Statystyki',
        icon: 'show_chart',
        path: '/zadania-domowe'
    },
    {
        title: 'Ustawienia',
        icon: 'settings_applications',
        path: '/zadania-domowe'
    }
];


export const studentNav : ReadonlyArray<INavigationItem> = [
    {
        title: 'Pulpit',
        icon: 'home',
        path: '/panel'
    },
    {
        title: 'Zadania domowe',
        icon: 'list',
        path: '/zadania-domowe'
    },
    {
        title: 'Statystyki',
        icon: 'show_chart',
        path: '/zadania-domowe'
    },
    {
        title: 'Ustawienia',
        icon: 'settings_applications',
        path: '/zadania-domowe'
    }
];



export const adminNav : ReadonlyArray<INavigationItem> = [];
