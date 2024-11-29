import './AddCategorie.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';

function AddCategorie({
    setCategorieMode,
    addCategorieMode,
    newCategorie,
    addCategorie,
    categories,
    setCategories,
    setNewCategorie,
}) {
    // État pour suivre quelle catégorie a le menu déroulant ouvert
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [editModeId, setEditModeId] = useState(null); // ID de la catégorie en cours d'édition
    const [editedName, setEditedName] = useState(''); // Nom modifié de la catégorie

    // Référence pour détecter les clics extérieurs
    const dropdownRef = useRef(null);

    // Gérer l'ouverture/fermeture du menu
    const toggleDropdown = (categorieId) => {
        if (dropdownOpenId === categorieId) {
            setDropdownOpenId(null); // Fermer si déjà ouvert
        } else {
            setDropdownOpenId(categorieId); // Ouvrir pour cette catégorie
        }
    };

    // Fermer la boîte si on clique à l'extérieur
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpenId(null); // Fermer le menu
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Activer le mode édition pour une catégorie
    const enableEditMode = (id, currentName) => {
        setEditModeId(id);
        setEditedName(currentName); // Pré-remplir avec le nom actuel
        setDropdownOpenId(null); // Fermer le menu dropdown
    };

    // Valider la modification
    const saveCategoryName = (id) => {
        const updatedCategories = categories.map((cat) =>
            cat.id === id ? { ...cat, name: editedName } : cat
        );
        setCategories(updatedCategories);
        setEditModeId(null); // Quitter le mode édition
    };

    // Supprimer une catégorie
    const deleteCategory = (id) => {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette catégorie ?');
        if (confirmDelete) {
            setCategories(categories.filter((cat) => cat.id !== id));
            setDropdownOpenId(null); // Fermer le menu après suppression
        }
    };

    return (
        <div className="categories" ref={dropdownRef}>
            <button onClick={setCategorieMode} className="categorie_button">
                <p>+</p>
            </button>
            {addCategorieMode ? (
                <>
                    <input
                        type="text"
                        placeholder="Entrez une catégorie"
                        value={newCategorie}
                        onChange={(e) => setNewCategorie(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCategorie()}
                    />
                    <button onClick={addCategorie}>Save</button>
                </>
            ) : (
                <>
                    {categories.map((categorie) => (
                        <div key={categorie.id} className="categorie-container">
                            <button className="categorie_button">
                                {editModeId === categorie.id ? (
                                    <div className="edit-mode">
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            onKeyDown={(e) => e.key ==='Enter' && saveCategoryName(categorie.id)}
                                        />
                                        <button onClick={() => saveCategoryName(categorie.id)}>
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <p>{categorie.name}</p>
                                )}
                                { editModeId !== categorie.id ? (
                                      <FontAwesomeIcon
                                      icon={faEllipsisVertical}
                                      size="s"
                                      onClick={() => toggleDropdown(categorie.id)}
                                  />
                                ) : (null)}
                            </button>
                            {dropdownOpenId === categorie.id && (
                                <div className="dropdown_buttons">
                                    <button onClick={() => enableEditMode(categorie.id, categorie.name)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteCategory(categorie.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default AddCategorie;
