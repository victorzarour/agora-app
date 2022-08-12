# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_11_204732) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "due_date"
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_assignments_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "university"
    t.string "title"
    t.bigint "professor_id", null: false
    t.string "department"
    t.string "days"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["professor_id"], name: "index_courses_on_professor_id"
  end

  create_table "professors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "syllabus_entries", force: :cascade do |t|
    t.bigint "syllabus_id", null: false
    t.date "date"
    t.string "assignment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["syllabus_id"], name: "index_syllabus_entries_on_syllabus_id"
  end

  create_table "syllabuses", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_syllabuses_on_course_id"
  end

  add_foreign_key "assignments", "courses"
  add_foreign_key "courses", "professors"
  add_foreign_key "syllabus_entries", "syllabuses"
  add_foreign_key "syllabuses", "courses"
end