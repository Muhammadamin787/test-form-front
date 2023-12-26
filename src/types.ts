export interface OptionType {
     label: string,
     value: number
}

export interface IFormValue {
     name: string
     sector_id: number
     is_agreed: boolean
}

export interface ISector {
     id: number
     name: string
     children: ISector[]
     parent_sector_id: number | null
}

export interface IOption {
     label: string
     value: number
}

export interface IUser {
     id?: string
     name: string
     sector_id: number
     is_agreed: boolean
}

