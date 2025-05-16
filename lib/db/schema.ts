import {pgTable,text,uuid,integer,boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


export const file = pgTable("file", {
    id: uuid("id").primaryKey().defaultRandom(),

    //basic file/folder info
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(), // folder

    //storage infotmation

})